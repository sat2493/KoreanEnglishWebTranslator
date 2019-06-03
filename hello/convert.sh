#!/bin/bash

npx babel lango.jsx --presets react-app/prod > user/lango.js

if grep -q "\/\*, onKeyPress: this\.CheckReturn\*\/" /home/satablig/b/hello/user/lango.js

then		
	sed -i'' "s/\/\*, onKeyPress: this\.CheckReturn\*\//, onKeyPress: this\.CheckReturn/" /home/satablig/b/hello/user/lango.js
        sed -i'' "s/\/\*, onClick: this\.StoreCard\*\//, onClick: this\.StoreCard/" /home/satablig/b/hello/user/lango.js
        sed -i'' "s/\/\*, onClick: this\.changeToReviewMode\*\//, onClick: this\.changeToReviewMode/" /home/satablig/b/hello/user/lango.js
else
	printf "%s\n" "No replacements needed"
fi
