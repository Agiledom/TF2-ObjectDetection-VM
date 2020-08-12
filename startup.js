module.exports = {
  startupScript: `
    #! /bin/bash
    apt update
    apt install -y python3.8 python3.8-dev protobuf-compiler python3-pip

    # install additional packages
    sudo pip3 install tensorflow

    git clone https://github.com/tensorflow/models.git
    cd models/research

    # Compile protos and install object detection api
    protoc object_detection/protos/*.proto --python_out=.
    cp object_detection/packages/tf2/setup.py .
    sudo python3 -m pip install .

  `,
};
