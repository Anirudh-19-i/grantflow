# Contributing to AlgoInt

Thank you for your interest in contributing to the AlgoInt Grant Tracker! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites
- Git
- Node.js 16+
- npm or yarn
- Basic knowledge of React and JavaScript

### Development Setup

1. **Fork the repository**
   - Click the "Fork" button on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/algoint.git
   cd algoint
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/original-owner/algoint.git
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

6. **Start development**
   ```bash
   npm start
   ```

## Development Workflow

### Before You Start

1. Check if there's an existing issue for your feature/bug
2. If not, create an issue first discussing your changes
3. Wait for maintainer feedback before starting work

### Making Changes

1. **Keep commits atomic and meaningful**
   ```bash
   git commit -m "feat: add grant filter functionality"
   ```

2. **Follow the commit message format**
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for code style changes
   - `refactor:` for code refactoring
   - `test:` for test changes

3. **Write clean, readable code**
   - Follow existing code style
   - Use meaningful variable names
   - Add comments for complex logic
   - Keep functions focused and small

4. **Test your changes**
   ```bash
   npm test
   ```

5. **Build before submitting**
   ```bash
   npm run build
   ```

### Submitting a Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request on GitHub**
   - Clear description of changes
   - Reference any related issues (#123)
   - Screenshots for UI changes

3. **PR Title Format**
   ```
   [CATEGORY] Short description
   Examples: [FEATURE] Add wallet balance display
             [FIX] Correct login validation
             [DOCS] Update README instructions
   ```

4. **PR Description Template**
   ```markdown
   ## Description
   Briefly describe your changes.

   ## Related Issues
   Closes #123

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   Describe how to test your changes.

   ## Screenshots (if applicable)
   Include screenshots for UI changes.

   ## Checklist
   - [ ] Code follows project style
   - [ ] Tests pass locally
   - [ ] No console errors
   - [ ] Comments added for complex logic
   ```

## Code Style Guide

### JavaScript/React

```javascript
// Use const and let, avoid var
const userName = 'John';
let counter = 0;

// Arrow functions
const handleClick = () => { };

// Component naming - PascalCase
const MyComponent = () => { };

// File naming - PascalCase for components, camelCase for utilities
// src/components/MyComponent.js
// src/utils/formatDate.js

// Meaningful names
const isUserLoggedIn = true;  // Good
const f = true;              // Avoid

// Comments
// Use for complex logic only
const calculateDiscount = (price, discount) => {
  // Apply compound discount calculation
  return price * (1 - discount) * 0.95;
};
```

### CSS

- BEM naming convention when possible
- Mobile-first approach
- Use CSS variables for consistency
- Keep specificity low

```css
.card { }
.card-header { }
.card-header-title { }

.button--primary { }
.button--disabled { }
```

## Project Structure

```
frontend/src/
├── components/        # Reusable components
├── contexts/          # React Context providers
├── pages/             # Page components
├── services/          # External service integration
├── styles/            # Global and component styles
└── App.js             # Root component
```

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for reasonable code coverage

```bash
npm test
npm test -- --coverage
```

## Documentation

- Update README if adding features
- Add JSDoc comments to complex functions
- Include examples for new APIs

```javascript
/**
 * Calculates the grant approval status
 * @param {Object} grant - The grant object
 * @param {boolean} grant.milestone_approved - Milestone status
 * @returns {string} The approval status
 */
const getGrantStatus = (grant) => {
  return grant.milestone_approved ? 'approved' : 'pending';
};
```

## Common Issues

### Dependencies Conflicts
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
The app will auto-select another port, or:
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -ti :3000 | xargs kill -9
```

### Git Issues

**Reset to upstream:**
```bash
git fetch upstream
git reset --hard upstream/main
```

**Clean up local branches:**
```bash
git branch -d feature/old-feature
```

## Review Process

1. Maintainers will review your PR
2. Changes may be requested
3. Respond to feedback professionally
4. Update PR as needed
5. Once approved, we'll merge!

## Questions?

- Open a GitHub Discussion
- Check existing issues
- Email: developer@algoint.app

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AlgoInt! 🎉
