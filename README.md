# eil

**E**c2 **I**nstance **L**auncher

## usage

The bash script requires the following binaries: `jq`, `aws`, `ssh`, `curl`.

Set up your AWS credentials

```bash
$ aws configure --profile eil
# access key
# secret key
# region
```

then, run `./eil`.

## alternative docker usage

To avoid requiring the dependencies locally, there's a docker image
with all the binaries. From the root of this repo,

```bash
$ docker pull gempesaw/eil:deps
$ docker run -it --rm --entrypoint sh -v $(pwd):$(pwd) -w $(pwd) gempesaw/eil:deps
```

and then once inside the docker image, you're back at the usage
instructions:

```bash
$ aws configure --profile eil
$ ./eil
```

## example output

```bash
bash-3.2$ ./eil
creating security group acsrCcuK-sg...
opening acsrCcuK-sg security group ports 22 & 80
creating key pair acsrCcuK-key


starting instance...
waiting for instance i-0f77c960c7ad7cc68 to be running...
i-0f77c960c7ad7cc68 is running with public dns ec2-34-254-96-222.eu-west-1.compute.amazonaws.com.


connecting to i-0f77c960c7ad7cc68 at ec2-34-254-96-222.eu-west-1.compute.amazonaws.com to start server...
Warning: Permanently added 'ec2-34-254-96-222.eu-west-1.compute.amazonaws.com,34.254.96.222' (ECDSA) to the list of known hosts.
sleeping a bit to let server start...
testing server via curl:
* Rebuilt URL to: ec2-34-254-96-222.eu-west-1.compute.amazonaws.com/
*   Trying 34.254.96.222...
* TCP_NODELAY set
* Connected to ec2-34-254-96-222.eu-west-1.compute.amazonaws.com (34.254.96.222) port 80 (#0)
> GET / HTTP/1.1
> Host: ec2-34-254-96-222.eu-west-1.compute.amazonaws.com
> User-Agent: curl/7.54.0
> Accept: */*
>
* HTTP 1.0, assume close after body
< HTTP/1.0 200 OK
< Server: SimpleHTTP/0.6 Python/2.7.14
< Date: Thu, 12 Jul 2018 14:52:03 GMT
< Content-type: text/html
< Content-Length: 12
< Last-Modified: Thu, 12 Jul 2018 14:51:58 GMT
<
hello world
* Closing connection 0


the following may be useful for cleanup:

aws ec2 terminate-instances --instance-id i-0f77c960c7ad7cc68 && \
aws ec2 wait instance-terminated --instance-ids i-0f77c960c7ad7cc68 && \
aws ec2 delete-security-group --group-name acsrCcuK-sg && \
aws ec2 delete-key-pair --key-name acsrCcuK-key && \
rm -f acsrCcuK-key.pem
```
