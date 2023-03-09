/*
 * @Description:
 * @Date: 2023-03-09 16:11:53
 * @LastEditTime: 2023-03-09 16:25:16
 */
import { Input } from "antd";
import { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { ColumnContainer } from ".";
import { Container } from "./kanban-column";
import { useKanbansQueryKey, useProjectIdUrl } from "./utils";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };
  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
