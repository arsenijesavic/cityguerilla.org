import CMS from 'netlify-cms'

// import AboutPagePreview from './preview-templates/AboutPagePreview'
// import BlogPostPreview from './preview-templates/BlogPostPreview'
// import ProductPagePreview from './preview-templates/ProductPagePreview'

// CMS.registerPreviewStyle('/styles.css')
// CMS.registerPreviewTemplate('about', AboutPagePreview)
// CMS.registerPreviewTemplate('products', ProductPagePreview)
// CMS.registerPreviewTemplate('blog', BlogPostPreview)

import CategoriesControl from './widgets/CategoriesControl'

CMS.registerWidget('categories', CategoriesControl, null);