#!/bin/bash

# Install SDKMan if not found ( For Java )
if [[ $(whereis sdk) == *sdk* ]]; then
    curl -s "https://get.sdkman.io" | bash -s -- -y
    source "$HOME/.sdkman/bin/sdkman-init.sh"
    sdk install ant
    sdk install java
    sdk install maven
fi

