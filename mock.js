function generatePasswords() {
  const sites = [
    "AWS",
    "Azure",
    "GCP",
    "Jira",
    "GitHub",
    "GitLab",
    "Slack",
    "VPN",
    "Banco Interno",
    "ERP",
    "CRM"
  ];

  const owners = [
    "gustavo",
    "ana.silva",
    "carlos.dev",
    "mariana",
    "joao",
    "ti.admin",
    "financeiro",
    "rh.user"
  ];

  const passwords = [];

  for (let i = 1; i <= 15; i++) {
    const site = sites[Math.floor(Math.random() * sites.length)];
    const owner = owners[Math.floor(Math.random() * owners.length)];

    const createdDate = new Date(Date.now() - Math.random() * 1e10);
    const updatedDate = new Date(createdDate.getTime() + Math.random() * 5e9);

    passwords.push({
      id: `pwd-${String(i).padStart(3, "0")}`,
      username: `${owner}`,
      site: site,
      password: `P@ssw0rd!${Math.floor(Math.random() * 9999)}`, // pode trocar por "******" se quiser esconder
      date_created: createdDate.toISOString(),
      last_update: updatedDate.toISOString(),
      owner: owner
    });
  }

  return passwords;
}

// exemplo de uso
console.log(JSON.stringify(generatePasswords(), null, 2));
