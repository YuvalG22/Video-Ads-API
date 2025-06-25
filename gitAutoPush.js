import { execSync } from "child_process";

const commitMessage = process.argv[2] || 'Auto commit';

try {
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });

  console.log('✅ Git push completed successfully.');
} catch (error) {
  console.error('❌ Error during git operations:', error.message);
}