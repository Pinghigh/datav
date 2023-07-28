// Copyright 2023 Datav.io Team
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Button } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { Input } from "@chakra-ui/input"
import { Box, HStack, StackDivider, Text, VStack } from "@chakra-ui/layout"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal"

import { useStore } from "@nanostores/react"
import { Select } from "antd"
import { ColorPicker } from "components/ColorPicker"
import { EditorInputItem, EditorNumberItem } from "components/editor/EditorItem"
import { cloneDeep } from "lodash"
import React, { memo, useState } from "react"
import { FaPlus, FaRegCopy, FaTimes } from "react-icons/fa"
import { ValueMappingMsg, commonMsg } from "src/i18n/locales/en"
import { ValueMappingItem } from "types/dashboard"
const { Option } = Select
interface Props {
    value: ValueMappingItem[]
    onChange: any
}
const ValueMapping = memo((props: Props) => {
    const { onChange } = props
    if (!props.value) {
        onChange([])
        return
    }

    const t = useStore(commonMsg)
    const t1 = useStore(ValueMappingMsg)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [value, setValue] = useState<ValueMappingItem[]>(props.value)

    const onAdd = () => {
        value.unshift({
            type: 'value',
            value: '',
            text: '',
            color: null
        })
        setValue(cloneDeep(value))
    }

    const onSubmit = () => {
        onChange(value)
        onClose()
    }

    const onClone = (i) => {
        const newValue = []
        for (let j = 0; j < value.length; j++) {
            if (i == j) {
                newValue.push(value[j])
                newValue.push(cloneDeep(value[j]))
            } else {
                newValue.push(value[j])
            }
        }
        setValue(newValue)
    }

    const onRemove = (i) => {
        value.splice(i, 1)
        setValue(cloneDeep(value))
    }

    return (<>
        <Button size="sm" colorScheme="gray" onClick={onOpen}>{t.editItem({ name: t.valueMapping })}</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minWidth="900px">
                <ModalHeader>{t.valueMapping}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack alignItems="left" divider={<StackDivider />} spacing={3} maxH="600px" overflowY="scroll" >
                        {
                            value.map((v, i) => {
                                const typeOption = typeOptions.find(t => t.value === v.type)
                                return (
                                    <HStack  key={i + v.type + v.value} divider={<StackDivider />} spacing={3}>
                                        <Select
                                            style={{ minWidth: '120px' }}
                                            placeholder="mapping type"
                                            value={v.type}
                                            onChange={v1 => {
                                                value[i].type = v1
                                                if (v.type == "range") {
                                                    value[i].value = {
                                                        from: null,
                                                        to: null
                                                    }
                                                } else {
                                                    value[i].value = ''
                                                }
                                                setValue(cloneDeep(value))
                                            }}
                                            popupMatchSelectWidth={false}
                                            optionLabelProp="label"
                                            bordered={false}
                                        >
                                            {
                                                typeOptions.map((t, i) => {
                                                    return <Option value={t.value} label={t.label}>
                                                        <Text fontWeight={550}>{t.label}</Text>
                                                        <Text textStyle="annotation" fontSize="0.9rem">{t.desc}</Text>
                                                    </Option>
                                                })
                                            }
                                        </Select>
                                        <HStack width="300px">
                                            {
                                                v.type == "range"
                                                    ?
                                                    <HStack>
                                                        <Text textStyle="annotation" fontWeight="500">From</Text><EditorNumberItem placeholder={typeOption?.placeholder} value={v.value.from} onChange={v => {
                                                            value[i].value.from = v
                                                            setValue(cloneDeep(value))
                                                        }} />
                                                        <Text textStyle="annotation" fontWeight="500">To</Text><EditorNumberItem placeholder={typeOption?.placeholder1} value={v.value.to} onChange={v => {
                                                            value[i].value.to = v
                                                            setValue(cloneDeep(value))
                                                        }} />
                                                    </HStack>
                                                    :
                                                    <EditorInputItem bordered={false} value={v.value} placeholder={typeOption?.placeholder} onChange={v1 => {
                                                        value[i].value = v1
                                                        setValue(cloneDeep(value))
                                                    }}  disabled={v.type == "null"}/>
                                            }
                                        </HStack>
                                        <Box width="150px">
                                            <EditorInputItem bordered={false} value={v.text} placeholder="text" onChange={v => {
                                                value[i].text = v
                                                setValue(cloneDeep(value))
                                            }} />
                                        </Box>
                                        <ColorPicker color={v.color??""} onChange={c => {
                                            value[i].color = c
                                            setValue(cloneDeep(value))
                                        }} />
                                        <HStack pl="2" textStyle="annotation" spacing={4}>
                                            <FaRegCopy cursor="pointer" className="hover-text" onClick={() => onClone(i)}/>
                                            <FaTimes cursor="pointer" className="hover-text" onClick={() => onRemove(i)}/>
                                        </HStack>
                                    </HStack>)
                            })

                        }
                    </VStack>
                </ModalBody>

                <ModalFooter justifyContent="space-between">
                    <Button variant="ghost" leftIcon={<FaPlus />} onClick={onAdd}>{t.newItem({ name: t.valueMapping })}</Button>

                    <HStack spacing={3}>
                        <Button variant="outline" onClick={onClose}>
                            {t.cancel}
                        </Button>
                        <Button variant='solid' onClick={onSubmit}>{t.submit}</Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>)
})

export default ValueMapping

const typeOptions = [
    {
        label: 'Value',
        value: 'value',
        desc: 'Natch a given text',
        placeholder: 'Exactly match'
    },
    {
        label: 'Range',
        value: "range",
        desc: 'Match a range of numbers',
        placeholder: 'e.g 1',
        placeholder1: 'e.g 10',
    },
    {
        label: 'Regex',
        value: 'regex',
        desc: 'Match a regular expression pattern',
        placeholder: 'Regular expression pattern'
    },
    {
        label: 'Null',
        value: 'null',
        desc: "Match null, undefined, empty string or NaN",
        placeholder: "Match null, undefined, empty string or NaN"
    }
]