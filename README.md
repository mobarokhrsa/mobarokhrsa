Step 6 — Add your GitHub Pages domain

This is important before deploying.

Go to:

Firebase Console → Authentication → Settings → Authorized domains

Add your GitHub Pages domain.

For example:

yourusername.github.io

If you're testing locally, you may also need to add your local development domain, depending on your setup. Firebase specifically documents authorized domains as part of Authentication configuration.

Don't add a path such as:

yourusername.github.io/arabic-learning-app

Use the domain:

yourusername.github.io