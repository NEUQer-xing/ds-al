<template>
    <Content :style="{minHeight: '450px', background: '#fff'}" ref="chatListDom">
      <Card v-for="item of messageList.filter((v) => v.role !== 'system')">
          <Avatar v-if="item.role=='user'" shape="square" src="../../assets/img/D&A-icon.png"/>
          <Avatar v-else shape="square" icon="ios-ionitron-outline" style="background: #000;"/>
          &nbsp;
          <strong> {{ roleAlias[item.role] }} </strong>
          <!-- 换行 -->
          <br />
          <br />
          <div v-if="item.content" v-html="md.render(item.content)"></div>
          <Loding v-else />
      </Card>                
    </Content>
    <br />
    <br />
    <Input placeholder="请输入您要询问的问题~" v-model="messageContent" @keydown.enter="sendOrSave()" />
    <space><p>&nbsp;
    </p></space>
    <Button type="success" @click="sendOrSave()" long ghost>发送</Button>
</template>

<script setup lang="ts">
import type { ChatMessage } from "../../types";
import { ref, watch, nextTick} from "vue";
import { chat } from "../../libs/gpt";
import Loding from "../chatgpt/Loding.vue";
import { md } from "../../libs/markdown";
let apiKey = "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"; // chatgpt api key
let isTalking = ref(false);
let messageContent = ref("");
const chatListDom = ref<HTMLDivElement>();
const decoder = new TextDecoder("utf-8");
const roleAlias = { user: "DS&AL", assistant: "AI助理", system: "System" };
const messageList = ref<ChatMessage[]>([
  {
    role: "assistant",
    content: `召唤我的小可爱，你好!
    我是数据结构与算法可视化平台(DS&AL)的AI助理~
    您可以通过下方的输入框向我提问，我会尽力为您解答。`,
  },
]);
const sendChatMessage = async (content: string = messageContent.value) => {
  try {
    isTalking.value = true;
    if (messageList.value.length === 2) {
      messageList.value.pop();
    }
    messageList.value.push({ role: "user", content });
    clearMessageContent();
    messageList.value.push({ role: "assistant", content: "" });

    const { body, status } = await chat(messageList.value, apiKey);
    if (body) {
      const reader = body.getReader();
      await readStream(reader, status);
    }
  } catch (error: any) {
    appendLastMessageContent(error);
  } finally {
    isTalking.value = false;
  }
};

const readStream = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  status: number
) => {
  let partialLine = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const decodedText = decoder.decode(value, { stream: true });
    if (status !== 200) {
      const json = JSON.parse(decodedText); // start with "data: "
      const content = json.error.message ?? decodedText;
      appendLastMessageContent(content);
      return;
    }
    const chunk = partialLine + decodedText;
    const newLines = chunk.split(/\r?\n/);
    partialLine = newLines.pop() ?? "";
    for (const line of newLines) {
      if (line.length === 0) continue; // ignore empty message
      if (line.startsWith(":")) continue; // ignore sse comment message
      if (line === "data: [DONE]") return; //
      const json = JSON.parse(line.substring(6)); // start with "data: "
      const content =
        status === 200
          ? json.choices[0].delta.content ?? ""
          : json.error.message;
      appendLastMessageContent(content);
    }
  }
};

const appendLastMessageContent = (content: string) =>
  (messageList.value[messageList.value.length - 1].content += content);

const sendOrSave = () => {
    sendChatMessage();
};

const clearMessageContent = () => (messageContent.value = "");

const scrollToBottom = () => {
  if (!chatListDom.value) return;
  scrollTo(0, chatListDom.value.scrollHeight);
};

watch(messageList.value, () => nextTick(() => scrollToBottom()));

</script>

<style scoped>

</style>
