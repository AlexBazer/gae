# Backend app(you should work with it from **project root** folder)
## Initialize local environment
### Download and unpack google python sdk in the root direcroty
```
wget https://storage.googleapis.com/appengine-sdks/featured/google_appengine_1.9.36.zip -O temp.zip && unzip temp.zip && rm temp.zip
```
### Run local server
```
python google_appengine/dev_appserver.py app/
```

## Initialize test environment
### Install requirements in the app/lib directory
```
pip install -r requirements.txt  -t app/lib/
```
### Run tests
```
python testrunner.py google_appengine/ app/
```

# Front end app
## Initialize development environment(you should work with it from **app_client** folder)
### Install gulp globally packages
```
npm -g i gulp
```
### Install project npm packages
```
npm i
```
### Run gulp
```
gulp
```
