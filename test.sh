#!/bin/bash


if [[ $(whereis starship) == *starship* ]]
then
    echo "Found"
else
    echo "Not Found"
fi
