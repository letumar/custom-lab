FROM docker.io/letumar/podman-certificate-generator as certs
FROM docker.io/letumar/ubi8
RUN dnf module install -y nodejs:16 && \
groupadd -r student && useradd -r -m -g student student
COPY --from=certs --chown=student:student /app/*.pem /etc/pki/tls/private/certs/
COPY --chown=student:student . /app/
