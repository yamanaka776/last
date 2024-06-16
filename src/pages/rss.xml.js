import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
export async function GET(context) {
	const blogs = await getCollection("blog");
	return rss({
		// 出力されるXMLの`<title>`フィールド
		title: "ear-diary",
		// 出力されるXMLの`<description>`フィールド
		description: "ear-diary",
		// エンドポイントのコンテキストからプロジェクトの"site"を取得
		// https://docs.astro.build/ja/reference/api-reference/#contextsite
		site: context.site,
		// 出力されるXMLの<item>の
		// コンテンツコレクションやglobインポートを利用した例については「`items`の生成」セクションをご覧ください
		items: blogs.map((conten) => ({
			title: conten.data.title,
			pubDate: conten.data.pubDate,
			link: `blog/${conten.slug}/`,
		})),
		stylesheet: "/rss/styles.xsl",
	});
}
