import env from 'react-native-config'

const config = {
  api: {
    host: 'http://192.168.0.105:3000',
    timeout: 20000
  }
};

const API_HOST = config.api.host;

export {
  API_HOST
}

export default config