import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export function graphRequest(endpoint, fields) {
	const graphRequestManager = new GraphRequestManager();

	return new Promise((resolve, reject) => {
		const request = new GraphRequest(
			endpoint,
			fields,
			(error, data) => {
				if (error) {
					reject(error);
				} else {
					resolve(data);
				}
			},
		);

		graphRequestManager.addRequest(request).start();
	});
}
