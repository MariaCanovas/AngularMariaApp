# AngularMariaApp

This is a simple ToDo List using angularJs. It is possible to add new tasks to the list and save it in the local storage.

## Prerequisites for Windows

* Chrome: https://www.google.es/chrome/browser/desktop/
* Git: https://git-scm.com/downloads

## Getting Started

Just type these commands in the Git Bash console one by one.

```
git clone
npm install gulp -cli
npm install bower -cli
npm install
bower install
```

## Gulp tasks

*Concat ('concat')
	The files will be concatenated in the order that they are specified in the 'gulp_tasks/config.js' file. Then, will be only one js file named 'main.js' in 'concatFiles' folder.

*Sass ('sass')
	It will transform all the scss files specified in the imports of 'css/main.scss' in one css file named 'main.css' in 'concatFiles' folder.

*Watch ('watch')
	It watch if there is any change in the 'main.css' or 'main.js'. If there is some change in 'main.css', the sass task will be excuted and if there's a change in the 'main.js', the concat task will be executed.

## Run the application

Right click on the index.html file, select RUN.

Type the following command in the Git Bash console.

```
gulp watch
```

## Developing

Give Git your name and email.

```
git config --global user.name "Your name"
git config --global user.email "yourEmail@example.com"
```

## Testing

### Unit Tests

*Set de tests para mainController
	Check if the mainController methods work. For this, in the test there is a mock of the service (localStorage.js).

*Set of tests for clock directive
	Check if the methods of the directive controller work and also the directive template. 

### Running Unit Tests

Type the following command in the Git Bash console.

```
karma start
```

## Authors

- María Dolores Martínez (maria-dolores.martinez@gft.com)