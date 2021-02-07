import fetch from "node-fetch";
import semver from "semver";

const depsMap = {
	typescript: {
		"@types/react": "^17.0.0",
		"@types/node": "^14.14.22",
		typescript: "^4.1.3",
	},
	preact: {
		"@prefresh/next": "^1.3.0",
		preact: "^10.5.5",
		"preact-render-to-string": "^5.1.11",
		"@preact/compat": "^0.0.4",
		"preact-ssr-prepass": "^1.1.2",
		"next-plugin-preact": "^3.0.3",
	},
	sass: {
		sass: "^1.32.6",
	},
	tailwind: {
		autoprefixer: "^10.2.1",
		postcss: "^8.2.4",
		tailwindcss: "^2.0.2",
	},
	"styled-components": {
		"styled-components": "^5.0.0",
		"babel-plugin-styled-components": "^1.8.0",
		"@types/styled-components": "^5.1.7",
	},
	"chakra-ui": {
		"@chakra-ui/react": "^1.1.5",
		"@emotion/react": "^11.1.4",
		"@emotion/styled": "^11.0.0",
		"framer-motion": "^3.2.1",
	},
	mdx: {
		"@mdx-js/loader": "^1.5.1",
		"@mdx-js/react": "^1.6.18",
		"@next/mdx": "^10.0.6",
	},
};

function checkVersions() {
	for (const [recipe, deps] of Object.entries(depsMap)) {
		for (const [pkg, version] of Object.entries(deps)) {
			fetch(`https://registry.npmjs.org/-/package/${pkg}/dist-tags`)
				.then((res) => res.json())
				.then((npm) => {
					if (!semver.satisfies(npm.latest, version)) {
						// prettier-ignore
						console.log(
`Package ${pkg} in ${recipe} is outdated:
current version is ${version}, but latest is ${npm.latest}.
`
				);
					}
				});
		}
	}
}

checkVersions();
