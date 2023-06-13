module.exports = (api) => {
  api.cache(true)
  return {
    "env": {
      "development": {
        "plugins": [
          "transform-react-jsx-source",
          ["module-resolver", {
            "root": ["./src"]
          }]
        ],
        "plugins":['react-native-reanimated/plugin',  'transform-inline-environment-variables',['module:react-native-dotenv']],
        
      
    

        
      }
    },
    presets: ['babel-preset-expo']
  }
}