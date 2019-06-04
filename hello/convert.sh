#!/bin/bash

npx babel lango.jsx --presets react-app/prod > user/lango.js
printf "%s\n" "Converted!!"
