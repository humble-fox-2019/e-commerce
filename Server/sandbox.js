const regex = /(Wrong Username|Wrong Email|Wrong Password)/gi
const str = "Wrong Username / Email / Password"

console.log(str.match(regex))