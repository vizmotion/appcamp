#!/bin/bash

while test $# -gt 0; do
    case "$1" in
        -d)
            DEBUG="--log-level debug"
            ;;
        -r)
            # Support ti-inspector
            remote="--debug-host localhost:8999"
            ;;
    esac

    shift
done

exec titanium build --platform ios --ios-version 7.0 --retina --tall $DEBUG $remote
