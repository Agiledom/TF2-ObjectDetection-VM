### GCP VM with Object Detection API V2

This tool helps you easily create a VM in Google's Cloud Platform that has Tensorflows Object Detection API V2
pre-installed. One of the key advantages of using GCP for your TF2 models is the ability to run your training on TPU's

You can read more about the API here:

https://github.com/tensorflow/models/tree/master/research/object_detection

##### TLDR;

1. Create a project and a service account with in GCP.
2. Download and add the key file to the root of the directory.
3. Create a .env file with the PROJECT_ID, KEY_FILENAME (path) and GOOGLE_SERVICE_ACCOUNT variables.
4. Run `npm install`
5. Run `npm run start`

#### Detailed Instructions

##### Step 1

Ensure you have node.js installed on your machine and run the following in your terminal:

`git clone https://github.com/Agiledom/TF2-ObjectDetection-VM.git`

##### Step 2

Sign up with Google Compute Cloud (GCP). Upon joining you'll get \$300 in free credit, which is more than
enough to play around with the API.

Sign up here: https://cloud.google.com/free

You'll need to create a project and then create a service account (under IAM & Admin panel).

To get started quickly, I recommend you give the service account he role Compute Engine > Compute Admin.

Then, download a keyfile and move it to the root of your directory.

You can read more about service accounts here: https://cloud.google.com/iam/docs/service-accounts

##### Step 3

Create a file named .env in the root of your directory and add the following three variables to it:

1.  `PROJECT_ID=<insert-your-project-id-here`
2.  `KEY_FILENAME=./<insert-your-key-filename-here>`
3.  `GOOGLE_SERVICE_ACCOUNT=<insert-your-google-service-account-email-here>`

##### Step 4

Run `npm install` to install the projects dependencies

##### Step 5

Run `npm start` to create your VM.

If all has gone well, you should see a print out of the metadata for your VM in the console and you should
see the VM spinning up in the GCP console in your web browser

#### Notes

1. The startup script found in ./startup.js can take up to 40 minutes to fully run. This is due to opencv's
   extremely lengthy install times. You can check the console logs (for the start up script) by clicking on the VM in GCP's browser console and clicking "serial port 1 (console)", under logging.

2. If you'd like extended output to see what the VM is up to, append "-vv" to the end of line 22 in startup.js

3. You can optionally create a GCP storage bucket on start up, by adding in:
   `gsutil mb -p $PROJECT_ID -c standard -l europe-west4 gs://<insert-your-awesome-bucket-name-here>`
   The privileges for maniupulating GCP storage buckets are already in place.
