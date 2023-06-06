# coingate-project

## Getting Started

These instructions will guide you to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Git
- Node.js (with npm installed)
- Ruby (version as per `.ruby-version`)
- Rails (version as per `Gemfile`)
- PostgreSQL

### Installing

1. Clone the repository:
```bash
git clone https://github.com/cridery/coingate-project.git
```

2. Navigate to the backend directory:
```bash
cd coingate-project/backend
```
3. Install the required Ruby gems:
```bash
bundle install
```
4. Setup the database:
```bash
rails db:setup
```
5. Start the Rails server on port 3001:
```bash
rails s -p 3001
```
6. Open a new terminal window and navigate to the frontend directory:
```bash
cd path-to-your-project/frontend
```
7. Install the necessary npm packages:
```bash
npm install
```
8. Start the React development server:
```bash
npm run start
```