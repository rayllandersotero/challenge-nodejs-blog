const siteTitle = 'Mustache Template'

exports.siteLang = "pt_BR"
exports.siteTitle = siteTitle
exports.menu = [
    {
        text: "Home",
        slug: "/",
        title: `Página inicial ${siteTitle}`,
        guest: true,
        logged: true
    },
    {
        text: "Blog",
        slug: "/blog",
        title: `Blog de ${siteTitle}`,
        guest: true,
        logged: true
    },
    {
        text: "Add Post",
        slug: "/post/add",
        title: `Adicionar um post em ${siteTitle}`,
        guest: false,
        logged: true
    },
    {
        text: "Registrar",
        slug: "/register",
        title: `Registar em ${siteTitle}`,
        guest: true,
        logged: false
    },
    {
        text: "Login",
        slug: "/login",
        title: `Logar em ${siteTitle}`,
        guest: true,
        logged: false
    },
    {
        text: "Sair",
        slug: "/logout",
        title: `Deslogar em ${siteTitle}`,
        guest: false,
        logged: true
    },
    {
        text: "Perfil",
        slug: "/profile",
        title: `Editar Perfil`,
        guest: false,
        logged: true
    }
]