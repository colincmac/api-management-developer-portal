const {deployNodeJS} = require("@azure/api-management-custom-widgets-tools")


// TODO: Add service information to env
// For now we are hardcoding the service information. Here's an example of what the service information should look like:
// const serviceInformation = {
// 	"resourceId": "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}",
// 	"managementApiEndpoint": "https://management.azure.com"
// }
const serviceInformation = {
	"resourceId": "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName",
	"managementApiEndpoint": "https://management.azure.com"
}
const name = "cw-asyncapi"
const fallbackConfigPath = "./static/config.msapim.json"
const config = {
	"interactiveBrowserCredentialOptions": {
		"redirectUri": "http://localhost:1337",
		"tenantId": "<tenant-id>"
	}
}

deployNodeJS(serviceInformation, name, fallbackConfigPath, config)
