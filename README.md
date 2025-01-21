# cloco-task-frontend
Repository for cloco task(Frontend)

## TABLE OF CONTENTS

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [LICENSE](#license)

## Getting Started
For detailed instructions on how to set up the project locally,please refer to the [Getting Started Guide](getting-started.md).

## Project Structure

```
- root
	- src/
		- app/ # Route folder
			- layout.tsx
			- page.tsx
		- shared/
			- components/ # Re-usable components will go here.

			- configs/ # Project specific configuration will go here.

			- fonts/ # Local font will go here.

			- hooks/ # Custom React hooks will go here.

			- providers/ # Context and providers will go here.

			- services/ # api-service related functions and files will go here.

			- styles/ # global styles will go here.

			- types/ # custom types throughout the project will go here.

			- ui/ # All re-usable UI components will go here.

			- utils/ # Utility functions will go here.
	- public/
	- .env.local
	- package.json
	- [...all other configuration files] #NOTE: DO NOT EDIT CONFIGURATION FILES
```

## License
This project is backed by the following license, please refer to the [license](LICENSE) section.
