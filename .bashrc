case $- in
    *i*) ;;
      *) return;;
esac

HISTCONTROL=ignoreboth

shopt -s histappend

HISTSIZE=1000
HISTFILESIZE=2000

shopt -s checkwinsize

[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

[ -f ~/.fzf.bash ] && source ~/.fzf.bash

### ________ My Custom Configs ________ ###

# Get number of installed packages
function get_packages_info() {
    local result="null"
    # Check for the presence of package managers and count installed packages
    if [ -x "$(command -v apk)" ]; then
        result=$(apk info | wc -l)
    elif [ -x "$(command -v apt-get)" ]; then
        result=$(dpkg --get-selections | wc -l)
    elif [ -x "$(command -v dnf)" ]; then
        result=$(dnf list installed | grep -c '^[a-zA-Z0-9]')
    elif [ -x "$(command -v zypper)" ]; then
        result=$(zypper --no-refresh se --installed-only | grep -c '^i')
    else
        result="No compatible package manager found."
    fi

    # Return the result
    echo "$result"
}

# Detect GPU model
detect_gpu_model() {
    # Check for lspci (commonly available on most distros)
    if command -v lspci &> /dev/null; then
        lspci | grep -i -e 'vga.*nvidia' -e 'vga.*amd' | head -n 1 | grep -oP '(?<=: ).*'
        return
    fi

    # Check for glxinfo (might require mesa-utils on some systems)
    if command -v glxinfo &> /dev/null; then
        glxinfo | grep -i 'OpenGL renderer' | awk -F ': ' '{print $2}' | sed 's/.*\(NVIDIA.*\|AMD.*\|Intel.*\).*/\1/'
        return
    fi

    # For systems with NVIDIA GPUs and nvidia-smi installed
    if command -v nvidia-smi &> /dev/null; then
        nvidia-smi --query-gpu=name --format=csv,noheader | sed 's/ .*//'
        return
    fi

    # For systems with AMD GPUs and rocm-smi installed
    if command -v rocm-smi &> /dev/null; then
        rocm-smi --showproductname | grep 'Product' | awk -F ': ' '{print $2}' | sed 's/ .*//'
        return
    fi

    echo "Unable to fetch GPU info."
}

# Custom Info
show_my_info () {
<<<<<<< HEAD
    if command -v fastfetch &> /dev/null; then
        fastfetch
    else
        output=$(curl -s https://ifconfig.me/)
        
        clear
        
        printf "\n"
        printf "   %s\n" "IP ADDR: $output"
        printf "   %s\n" "USER: $(whoami)"
        printf "   %s\n" "DATE: $(date)"
        printf "   %s\n" "UPTIME: $(uptime -p)"
        printf "   %s\n" "HOSTNAME: $(hostname -f)"
        printf "   %s\n" "CPU MODEL: $(lscpu | grep 'Model name' | cut -f 2 -d ':' | awk '{$1=$1}1')"
        printf "   %s\n" "GPU MODEL: $(detect_gpu_model)"
        printf "   %s\n" "DISTRO: $(grep 'PRETTY_NAME' /etc/*-release | sed 's/.*=//')"
        printf "   %s\n" "KERNEL: $(uname -rms)"
        printf "   %s\n" "PACKAGES: $(get_packages_info)"
        #printf "   %s\n" "RESOLUTION: $(xrandr | awk '/\*/{printf $1" "}')"
        #printf "   %s\n" "MEMORY: $(free -m -h | awk '/Mem/{print $3"/"$2}')"
        printf "\n"
    fi
=======
    output=$(curl https://ifconfig.me/)
    
    clear
    
    printf "\n"
    printf "   %s\n" "IP ADDR: $output"
    printf "   %s\n" "USER: $(whoami)"
    printf "   %s\n" "DATE: $(date)"
    printf "   %s\n" "UPTIME: $(uptime -p)"
    printf "   %s\n" "HOSTNAME: $(hostname -f)"
    printf "   %s\n" "CPU MODEL: $(command lscpu | grep 'Model name' | cut -f 2 -d ":" | awk '{$1=$1}1')"
    printf "   %s\n" "GPU MODEL: $(detect_gpu_model)"
    printf "   %s\n" "DISTRO: $(cat /etc/*-release | grep "PRETTY_NAME" | sed 's/.*=//')"
    printf "   %s\n" "KERNEL: $(uname -rms)"
    printf "   %s\n" "PACKAGES: $(get_packages_info)"
    #printf "   %s\n" "RESOLUTION: $(xrandr | awk '/\*/{printf $1" "}')"
    #printf "   %s\n" "MEMORY: $(free -m -h | awk '/Mem/{print $3"/"$2}')"
    printf "\n"
>>>>>>> main
}

alias vi="vim"
alias nvim="/usr/local/bin/nvim/bin/nvim"
<<<<<<< HEAD
alias luamake="/home/josh/lua-language-server/3rd/luamake/luamake"
=======

>>>>>>> main

# Install Starship if not found
# if [[ $(whereis starship) == *starship* ]]; then
#     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash -s -- -y
# fi
eval "$(starship init bash)" 
clear

# Java setup
#export JAVA_HOME=/usr/lib/jvm/java
#export JRE_HOME=/usr/lib/jvm/jre
#export PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
#export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64/bin
#export JAVA_HOME=/etc/alternatives/jre_1.8.0_openjdk
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin

# JDTLS
export JDTLS_HOME=/usr/local/bin/jdtls
export PATH=$PATH:$JDTLS_HOME/bin

# MAVEN
export M2_HOME=/usr/local/apache-maven
export M2=$M2_HOME/bin
export PATH=$M2:$PATH

# CARGO
# . "$HOME/.cargo/env"

# Google Java Format
export PATH=$PATH:/usr/local/bin/googleJavaFormat

# My Custom neofetch substitution
show_my_info

#NVM
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion




alias luamake="/home/josh/lua-language-server/3rd/luamake/luamake"
