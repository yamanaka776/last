import rss from '@astrojs/rss';
import { getBlogs } from "../library/microcms";
const response = await getBlogs({ fields: ["id", "title","eyecatch","publishedAt"] });
export function GET(context) {
  return rss({
    // 出力されるXMLの`<title>`フィールド
    title: 'ear-diary',
    // 出力されるXMLの`<description>`フィールド
    description: 'ear-diary',
    // エンドポイントのコンテキストからプロジェクトの"site"を取得
    // https://docs.astro.build/ja/reference/api-reference/#contextsite
    site: context.site,
    // 出力されるXMLの<item>の
    // コンテンツコレクションやglobインポートを利用した例については「`items`の生成」セクションをご覧ください
    items: response.contents.map((conten) => ({
	title: conten.title,
	pubDate: conten.publishedAt,
	link: `/${conten.id}/`
  })),
	stylesheet: '/rss/styles.xsl',
})}
