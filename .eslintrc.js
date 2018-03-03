module.exports = {
	"extends": "airbnb",
	"rules": {
		"indent": ["error", "tab"],
		"no-tabs": "off",
		"import/prefer-default-export": "off",
		"react/jsx-indent": ["error", "tab"],
		"react/jsx-indent-props": ["error", "tab"],
		"class-methods-use-this": "off",
		"max-len": ["error", 150, 8, {
			"ignoreUrls": true,
			"ignoreComments": true,
			"ignoreRegExpLiterals": true,
			"ignoreStrings": true,
			"ignoreTemplateLiterals": true
		}],
		"react/prefer-stateless-function": "off",
		// `.jsx` extension cannot be used with React Native
		// https://github.com/airbnb/javascript/issues/982
		"react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }]
	},
	"env": {
		"browser": true
	},
	"plugins": [
		"react"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		}
	},
	"globals": {
		"it": true,
		"describe": true,
		"beforeEach": true,
		"afterEach": true,
		"spyOn": true,
		"expect": true
	}
};
