export interface Partner {
    id: number;
    name: string;
    logo: string;
}

export const partners: Partner[] = [
    {
        id: 1,
        name: "Django Girls",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Django_Girls_logo.svg/1200px-Django_Girls_logo.svg.png",
    },
    {
        id: 2,
        name: "Open Source Community Africa",
        logo: "https://raw.githubusercontent.com/oscafrica/oscafrica.org-v2/main/public/images/logo/light/osca.svg",
    },
    {
        id: 3,
        name: "Python Software Foundation",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
    },
    {
        id: 4,
        name: "GitHub",
        logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    },
    {
        id: 5,
        name: "Google for Developers",
        logo: "https://www.gstatic.com/devrel-devsite/prod/v773193e230ce8d1973c735d469cf3e5d381165e6d6387063469e3bc6482f345c/developers/images/touchicon-180.png",
    },
    {
        id: 6,
        name: "Microsoft for Startups",
        logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageMW/RE1Mu3b?ver=5c31",
    }
];
