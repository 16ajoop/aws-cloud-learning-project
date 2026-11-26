#  Amazon Elastic Block Store 

## Overview

Hands-on practice with Amazon Elastic Block Store (EBS), AWS block storage for EC2 instances.


- Created an additional 2 GiB General Purpose SSD (gp3) EBS volume.
- Attached the volume to an EC2 instance.
- Identified the attached disk using Linux commands.
- Formatted the volume with the ext4 filesystem.
- Mounted the volume at `/data`.
- Created and stored a test file.
- Verified data persistence after unmounting and remounting.
- Detached and reattached the volume to verify data persistence.
- Configured automatic mounting using `/etc/fstab`.
- Safely detached and deleted the additional volume after completing the exercise.


## Linux Commands Practiced


### 1. Inspect Block Devices

```bash
lsblk
```
- Lists all block devices attached to the EC2 instance.
- Displays disk names, sizes, partitions, and mount points.
- Used to identify the newly attached 2 GiB EBS volume (`/dev/nvme1n1`).

```bash
lsblk -f
```
- Displays block devices along with filesystem information.
- Shows filesystem type, UUID, labels, and mount points.
- Used to check whether the new EBS volume had an existing filesystem.

### 2. Create a Filesystem

```bash
sudo mkfs -t ext4 /dev/nvme1n1
```
- `sudo`: Executes the command with administrator privileges.
- `mkfs`: Creates a filesystem on a storage device.
- `-t ext4`: Specifies the ext4 filesystem type.
- `/dev/nvme1n1`: Identifies the additional EBS volume.
- Used to format the blank EBS volume with the ext4 filesystem.

**Note:** Formatting a device erases its existing filesystem data. Always verify the correct device before running this command.

### 3. Create a Mount Directory

```bash
sudo mkdir /data
```
- `mkdir`: Creates a new directory.
- `/data`: Specifies the directory name and location.
- Used to create a mount point for accessing the EBS volume.

### 4. Mount the EBS Volume

```bash
sudo mount /dev/nvme1n1 /data
```
- `mount`: Attaches a filesystem to the Linux directory structure.
- `/dev/nvme1n1`: Specifies the EBS volume.
- `/data`: Specifies the mount point.
- Used to make the EBS volume accessible through the `/data` directory.

### 5. Verify the Filesystem UUID

```bash
sudo blkid /dev/nvme1n1
```
- `blkid`: Displays block device attributes.
- Identifies the filesystem type and UUID.
- Used to retrieve the UUID required for automatic mounting through `/etc/fstab`.

### 6. Verify the Mounted Volume

```bash
findmnt /data
```
- `findmnt`: Displays mounted filesystems.
- `/data`: Filters the output for the specified mount point.
- Used to verify that the EBS volume was successfully mounted.

### 7. Create and Verify a Test File

```bash
sudo touch /data/ebs-practice.txt
```
- `touch`: Creates an empty file if it does not already exist.
- Used to create a test file inside the mounted EBS volume.

```bash
echo "My first additional EBS volume!" | sudo tee /data/ebs-practice.txt
```
- `echo`: Produces the specified text.
- `|`: Passes the output to the next command.
- `tee`: Writes the received text into the specified file.
- `sudo`: Allows writing with administrator privileges.
- Used to store sample data on the EBS volume.

```bash
cat /data/ebs-practice.txt
```
- `cat`: Displays the contents of a file.
- Used to verify that the test data was successfully stored and remained accessible after remounting and reattaching the volume.

### 8. Configure Automatic Mounting

```bash
sudo cp /etc/fstab /etc/fstab.backup
```
- Creates a backup of the filesystem table before editing it.
- Helps restore the original configuration if an error occurs.

```bash
sudo nano /etc/fstab
```
- Opens the filesystem table in the Nano text editor.
- Used to add an entry containing the EBS volume UUID, mount point, filesystem type, and mount options.

```bash
sudo mount -a
```
- Attempts to mount all filesystems configured in `/etc/fstab` that are not currently mounted.
- Used to validate the automatic mounting configuration without rebooting.

**Important:** The EBS entry was removed from `/etc/fstab` before deleting the additional volume.

### 9. Unmount the EBS Volume

```bash
sudo umount /data
```
- `umount`: Detaches a mounted filesystem from its mount point.
- Used before detaching the EBS volume from the EC2 instance.



## Key Concepts

- EBS volumes
- Volume attachment and detachment
- Filesystems and formatting
- Mount points
- Data persistence
- Automatic mounting with `/etc/fstab`
- EBS volume cleanup

## Environment

- Cloud Provider: AWS
- Service: Amazon EBS
- EC2 OS: Amazon Linux 2023
- Volume Type: gp3
- Filesystem: ext4

## Outcome

Successfully attached, formatted, mounted, tested, detached, and deleted an additional EBS volume while preserving the EC2 root volume.
