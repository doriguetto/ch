import { exec } from "node:child_process";

const run = (cmd) => new Promise((resolve, reject) => exec(
  cmd,
  (error, stdout) => {
    if (error) reject(error);
    else resolve(stdout);
  }
));

// Check for modified Model JSON files that start with an underscore and run a build command if any are found
const checkModifiedJsonFiles = async () => {
    console.log('\n🔍 Checking for modified JSON files...');
    const changeset = await run('git diff --cached --name-only --diff-filter=ACMR');
    const modifiedFiles = changeset.split('\n').filter(Boolean);
    const modifiedPartials = modifiedFiles.filter((file) => file.match(/(^|\/)_.*.json/));

    if (modifiedPartials.length > 0) {
        console.log('🛠 Modified JSON files found. Running npm run build:json...');
        const output = await run('npm run build:json --silent');
        console.log(output);
        await run(
            'git add component-models.json component-definition.json component-filters.json',
        );
        console.log('✔ JSON build completed and changes staged.');
    } else {
        console.log('✔ No modified JSON files found.');
    }
};

const build = async () => {
    console.log('\n🧹 Building files assets...');
    try {
        const output = await run('npm run vite:build:production');
        console.log(output);
        await run(
            'git add blocks/ styles/',
        );
        console.log('✔ Assets build');
    } catch (error) {
        console.error(
            '✖ Assets build failed. Please fix the issues and try committing again.',
        );
        console.error(error.stdout || error);
        process.exit(1);
    }
};

// Main function to run all pre-commit checks sequentially
const main = async () => {
    try {
        console.log('Starting pre-commit checks...\n');
        await checkModifiedJsonFiles();
        await build();

        console.log('\n\n🎉 All pre-commit checks passed successfully!\n\n');
    } catch (error) {
        console.error('✖ Commit aborted. Please fix the issues and try again.');
        console.error('✖ Error in pre-commit hook:', error);
        process.exit(1);
    }
};

// Execute the main function to start the pre-commit checks
console.log('🐶 Husky\n\nInitializing pre-commit hook...');
main();
