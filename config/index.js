const deviceClientConfig = {
  keyPath:
    process.env.KEY_PATH,
  certPath:
    process.env.CERT_PATH,
  caPath: process.env.CA_PATH,
  clientId: "temperaturesensor", // Thing Name
  host: process.env.AWS_IOT_ENDPOINT, // Replace with your actual IoT endpoint
};

module.exports = { deviceClientConfig };
