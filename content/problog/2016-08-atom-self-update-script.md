+++
title = "Atom Self-Update Script"
slug = "2016/08/atom-self-update-script/"
date = 2016-08-08T03:06:34.247Z
+++
My work setup requires a non-administrator account for normal login. I have sudo access set up for my normal user. For some reason, Atom's autoupdate feature can't seem to deal with this and gets stuck in a loop trying to install updates. So I just scripted it as below:

```sh
update_atom() {
  local atom="${HOME}Downloads/atom.zip"
  echo -n "downloading…"
  curl --silent --fail --location 'https://atom.io/download/mac' > "${atom}"
  echo "✓"
  local version
  version=$(unzip -p "${atom}" Atom.app/Contents/Info.plist \
    | grep -A 1 -i CFBundleVersion \
    | grep string \
    | tr -d -c 0-9.)
  echo -n "install Atom ${version}? (y/n): "
  if [[ -n "${ZSH_VERSION}" ]]; then
    read -q confirm
  else
    read -n 1 confirm
  fi
  if [[ "${confirm}" != "y" ]]; then
    return 1
  fi
  echo -n "installing…"
  sudo rm -rf /Applications/Atom.app
  sudo unzip -q -d /Applications "${atom}"
  sudo chown -R "${USER}" /Applications/Atom.app
  echo -n "✓"
}
```
