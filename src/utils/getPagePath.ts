// 1. look in pages/_app.(tsx or jsx or js)
// 2. look in src/pages/_app.(tsx or jsx or js)
// 3. if none exist, look if tsconfig.json exists (-> ending = .tsx, else .js)
// 4. if none exist, look if src folder exists (-> return src/pages, else pages)

export const getAppPath = () => `pages/_app.tsx`;

export const getDocumentPath = () => `pages/_document.tsx`;
