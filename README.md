# Worldwide weather

Get the weather news for any city in the world!

Powered by [WeatherAPI.com](https://www.weatherapi.com/). Icons from there too.

## Installation

Clone this repository and go into its folder.

Run `npm install` in terminal.

## Configuration

Signup for free on [weatherapi.com](https://www.weatherapi.com/). and place an API key from there in a file named **.env** you create yourself in project root containing text like this (replace with your key):

```
WEATHER_API_KEY="YOUR_KEY_HERE"
```

## Usage

The dev command `npm run dev` will start a dev server on `http://localhost:9090/` and hot reload JS and SCSS code changes.

Production usage: run the build command `npm run build` and everything you need gets packed together into the public directory. You can upload the content to any hosting provider, without further modifications.

## Technologies used

JavaScript (ES6+), npm, Webpack, Babel, Bootstrap

## License:

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
