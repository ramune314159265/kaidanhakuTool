import { createListCollection } from '@chakra-ui/react'

export const jobs = Object.freeze({
	playwright: {
		id: 'playwright',
		name: '脚本家',
		description: '判定に失敗しても改変できる',
		hp: 3,
		ignoreFailed: true,
	},
	editor: {
		id: 'editor',
		name: '編集者',
		description: '判定に失敗したらGMはキーワードを1つ公開する',
		hp: 3,
		ignoreFailed: false,
	},
	psychic: {
		id: 'psychic',
		name: '霊媒師',
		description: '他プレイヤーが判定に失敗したときに代わりに耐久値を減らせる',
		hp: 4,
		ignoreFailed: false,
	},
	scientist: {
		id: 'scientist',
		name: '科学者',
		description: '1度に2つ修正点を指摘できる',
		hp: 2,
		ignoreFailed: false,
	},
	sorcerer: {
		id: 'sorcerer',
		name: '呪術師',
		description: '判定に成功したらその値を選んでいるプレイヤーの耐久が減る',
		hp: 6,
		ignoreFailed: false,
	},
	unemployed: {
		id: 'unemployed',
		name: '無職',
		description: '「おまえ、むーしょく」',
		hp: 5,
		ignoreFailed: false,
	},
})

export const jobsCollection = createListCollection({
	items: Object.values(jobs).map(job => {
		return {
			label: job.name,
			value: job.id
		}
	})
})
