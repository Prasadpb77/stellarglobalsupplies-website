/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://stellarglobalsupplies.com",
  generateRobotsTxt: false, // we already ship a static robots.txt
  changefreq: "weekly",
  priority: 0.7,
  outDir: "./out",
  exclude: ["/404"],
};
