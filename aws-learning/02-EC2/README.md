# Amazon EC2 – Hands-on Learning

## Overview

This project documents my hands-on learning of **Amazon Elastic Compute Cloud (EC2)**, an AWS service that provides scalable virtual servers in the cloud.

As part of this exercise, I launched an EC2 instance, connected to it securely using SSH, explored Linux commands, installed an Apache web server, and deployed a custom HTML webpage accessible through the internet.

## AWS Configuration

| Configuration | Details |
|---|---|
| Cloud Provider | Amazon Web Services (AWS) |
| Service | Amazon EC2 |
| Region | Asia Pacific (Hyderabad) – `ap-south-2` |
| Instance Name | `aws-learning-ec2` |
| Instance Type | `t3.micro` |
| Operating System | Amazon Linux 2023 |
| Authentication | SSH Key Pair |
| Key Pair Name | `pooja_hyd` |
| Web Server | Apache HTTP Server |
| Web Protocol | HTTP |
| HTTP Port | 80 |
| Root Storage | 8 GiB gp3 |

## Learning Objectives

- Understand EC2 instances and cloud-based virtual machines.
- Learn SSH authentication using public and private key pairs.
- Configure security groups and inbound traffic rules.
- Connect to a Linux server using Windows PowerShell.
- Practise basic Linux commands.
- Install and manage the Apache HTTP Server.
- Create and deploy a custom HTML webpage on EC2.

## Implementation

### 1. Launching an EC2 Instance

- Selected Amazon Linux 2023 as the operating system.
- Configured a `t3.micro` instance.
- Selected the existing `pooja_hyd` key pair.
- Used the default VPC and configured a security group.
- Configured an 8 GiB gp3 root volume.

### 2. Connecting Through SSH

Connected to the EC2 instance from Windows PowerShell using OpenSSH.

```powershell
ssh -i "C:\Users\POOJA\Desktop\pooja_hyd.pem" ec2-user@<PUBLIC_IP>
```

Learned how SSH uses a private key for secure authentication and how security groups control inbound access.

### 3. Linux Command Practice

Practised the following commands on Amazon Linux 2023:

| Command | Purpose |
|---|---|
| `whoami` | Check the current user |
| `cat /etc/os-release` | Display operating system details |
| `hostname -I` | Display the private IP address |
| `free -h` | Check memory usage |
| `df -h` | Check disk usage |
| `pwd` | Display the current directory |
| `ls -la` | List files, including hidden files |
| `mkdir` | Create directories |
| `cd` | Navigate between directories |
| `touch` | Create files |
| `echo` | Write text into files |
| `cat` | Display file contents |

### 4. Installing Apache HTTP Server

Installed Apache using the Amazon Linux package manager.

```bash
sudo dnf install -y httpd
```

Started and enabled the Apache service:

```bash
sudo systemctl enable --now httpd
```

Verified the service status:

```bash
sudo systemctl status httpd --no-pager
```

### 5. Deploying a Custom HTML Webpage

Created a custom webpage in Apache's default document root:

```bash
sudo nano /var/www/html/index.html
```

The webpage displays:

- Hello from AWS EC2!
- My First Cloud Deployment
- Amazon Linux 2023
- Apache HTTP Server

Tested the webpage locally on the EC2 instance:

```bash
curl http://localhost
```

### 6. Configuring HTTP Access

Updated the EC2 security group's inbound rules:

| Type | Port | Source |
|---|---|---|
| SSH | 22 | My IP |
| HTTP | 80 | Anywhere IPv4 |

Successfully accessed the deployed webpage through the EC2 public IPv4 address using a web browser.

## Architecture

```text
             Internet
                 |
                 |
          HTTP Request
             Port 80
                 |
                 v
       AWS Security Group
                 |
                 v
          Amazon EC2
       Amazon Linux 2023
                 |
                 v
        Apache HTTP Server
                 |
                 v
 /var/www/html/index.html
                 |
                 v
       Custom HTML Webpage
```

## Screenshots

Screenshots documenting the EC2 setup, SSH connection, Linux command practice, Apache installation, security group configuration, and successful webpage deployment are available in the `screenshots/` directory.

## Key Concepts Learned

- EC2 instances and virtual machines
- SSH and key-pair authentication
- Public and private IP addresses
- AWS security groups
- Linux command-line operations
- Apache web server installation and management
- HTTP communication and port configuration
- Hosting static webpages on EC2


## Author

**Pooja V**

B.Tech – Artificial Intelligence and Data Science

GitHub: [16ajoop](https://github.com/16ajoop)

---

*This project is part of my ongoing hands-on AWS Cloud Learning journey.*