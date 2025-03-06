import {
	DialogActionTrigger,
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	NumberInputField,
	NumberInputRoot
} from "@/components/ui/number-input"
import {
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from "@/components/ui/select"
import { AlertContent, AlertDescription, AlertIndicator, AlertRoot, AlertTitle, Button, createListCollection, FieldLabel, FieldRoot, HStack, Input, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { usePlayers } from '../atoms/players'
import { useReplacements } from '../atoms/replacements'
import { jobs } from '../utils/jobs'

export const ReplacementAddDialog = ({ children }) => {
	const [open, setOpen] = useState(false)
	const contentRef = useRef(null)
	const [players, { editPlayer }] = usePlayers()
	const [replacements, { addReplacement }] = useReplacements()
	const playersCollection = createListCollection({
		items: Object.values(players).map(job => {
			return {
				label: job.name,
				value: job.uuid
			}
		})
	})
	const [player, setPlayer] = useState([playersCollection.items[0].value])
	const [rollValue, setRollValue] = useState(null)
	const [replaceBefore, setReplaceBefore] = useState('')
	const [replaceAfter, setReplaceAfter] = useState('')
	const validate = () => {
		return player && rollValue && replaceBefore && replaceAfter
	}
	const onSubmit = () => {
		const playerData = players[player]
		if (rollValue !== playerData.rollValue || jobs[playerData.jobId].ignoreFailed) {
			addReplacement({ from: replaceBefore, to: replaceAfter })
		}
		if (rollValue !== playerData.rollValue) {
			editPlayer(player, { hp: playerData.hp - 1 })
		}
		setOpen(false)
		setRollValue(null)
		setReplaceBefore('')
		setReplaceAfter('')
	}
	return (
		<DialogRoot open={open} lazyMount onOpenChange={e => setOpen(e.open)}>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent ref={contentRef}>
				<DialogHeader>
					<DialogTitle>置き換えを追加</DialogTitle>
				</DialogHeader>
				<DialogBody>

					<VStack gap="4">
						<SelectRoot
							collection={playersCollection}
							size="sm"
							defaultOpen
							defaultValue={null}
							value={player}
							onValueChange={e => setPlayer(e.value)}
						>
							<SelectLabel>プレイヤー</SelectLabel>
							<SelectTrigger>
								<SelectValueText placeholder="プレイヤーを選択" />
							</SelectTrigger>
							<SelectContent portalRef={contentRef}>
								{playersCollection.items.map((p) => (
									<SelectItem item={p.value} key={p.value}>
										{p.label}
									</SelectItem>
								))}
							</SelectContent>
						</SelectRoot>

						<FieldRoot>
							<FieldLabel>ダイス出目</FieldLabel>
							<NumberInputRoot
								size="sm"
								min={1}
								max={6}
								allowOverflow={false}
								value={rollValue}
								onValueChange={e => setRollValue(e.value)}
							>
								<NumberInputField></NumberInputField>
							</NumberInputRoot>
						</FieldRoot>

						<HStack w="full">
							<FieldRoot>
								<FieldLabel>置き換え前</FieldLabel>
								<Input size="sm" value={replaceBefore} onChange={e => setReplaceBefore(e.target.value)}></Input>
							</FieldRoot>

							<FieldRoot>
								<FieldLabel>置き換え後</FieldLabel>
								<Input size="sm" value={replaceAfter} onChange={e => setReplaceAfter(e.target.value)}></Input>
							</FieldRoot>
						</HStack>

						<AlertRoot>
							<AlertIndicator></AlertIndicator>
							<AlertContent>
								<AlertTitle>{players[player].name}の役職({jobs[players[player].jobId].name})の効果</AlertTitle>
								<AlertDescription>{jobs[players[player].jobId].description}</AlertDescription>
							</AlertContent>
						</AlertRoot>
					</VStack>

				</DialogBody>
				<DialogFooter>
					<DialogActionTrigger asChild>
						<Button variant="outline">キャンセル</Button>
					</DialogActionTrigger>
					<Button disabled={(() => !validate())()} onClick={() => onSubmit()}>置き換える</Button>
				</DialogFooter>
				<DialogCloseTrigger />
			</DialogContent>
		</DialogRoot>
	)
}
