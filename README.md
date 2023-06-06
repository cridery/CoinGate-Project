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
3. Create .env file with COINGATE_API_KEY
```bash
COINGATE_API_KEY=EXAMPLE
```
4. Install the required Ruby gems:
```bash
bundle install
```
5. Setup the database:
```bash
rails db:setup
```
6. Start the Rails server on port 3001:
```bash
rails s -p 3001
```
7. Open a new terminal window and navigate to the frontend directory:
```bash
cd path-to-your-project/frontend
```
8. Install the necessary npm packages:
```bash
npm install
```
9. Start the React development server:
```bash
npm run start
```
