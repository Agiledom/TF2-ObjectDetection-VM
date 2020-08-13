"use strict";
require("dotenv").config({ path: "./.env" });

const { startupScript } = require("./startup.js");
const Compute = require("@google-cloud/compute");
const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEY_FILENAME;

const vmName = "my-awesome-VM-with-TF2";

const compute = new Compute({
  projectId,
  keyFilename,
});

const zone = compute.zone("europe-west4-a");

// Create a new VM, using default ubuntu image. The startup script
const config = {
  http: true,
  machineType: "n1-standard-1",
  disks: [
    {
      kind: "compute#attachedDisk",
      type: "PERSISTENT",
      boot: true,
      mode: "READ_WRITE",
      autoDelete: true,
      deviceName: vmName,
      initializeParams: {
        sourceImage:
          "projects/ubuntu-os-cloud/global/images/ubuntu-1804-bionic-v20200807",
        diskType:
          "projects/clarky-279622/zones/europe-west4-a/diskTypes/pd-standard",
        diskSizeGb: "50",
      },
      diskEncryptionKey: {},
    },
  ],
  serviceAccounts: [
    {
      email: process.env.GOOGLE_SERVICE_ACCOUNT,
      scopes: [
        "https://www.googleapis.com/auth/devstorage.full_control",
        "https://www.googleapis.com/auth/cloud-platform",
      ],
    },
  ],
  metadata: {
    items: [
      {
        key: "startup-script",
        value: startupScript,
      },
    ],
  },
};

const vm = zone.vm("clarky-test");

(async () => {
  try {
    const data = await vm.create(config);
    const operation = data[1];
    await operation.promise();

    // External IP of the VM.
    const metadata = await vm.getMetadata();
    console.log("[SUCCESS] ", metadata);
  } catch (error) {
    console.error(error);
  }
})();
