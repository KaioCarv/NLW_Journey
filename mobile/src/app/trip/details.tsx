import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import { linksServer } from "@/server/links-server";
import { colors } from "@/styles/colors";
import { validateInput } from "@/utils/validateInput";

import { Plus } from "lucide-react-native";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export function Details({tripId} : { tripId: string}) {
//MODAL
const [showNewLinkModal, setShowNewLinkModal] = useState(false)

//LOADING
const [isCreatingLinkTrip, setIsCreatingLinkTrip] = useState(false)

//DATA
const [linkTitle, setLinkTitle ] = useState('')
const [linkURL, setLinkURL] = useState('')

function resetNewLinkFields(){
  setLinkTitle("")
  setLinkURL("")
  setShowNewLinkModal(false)
}

async function handleCreateTripLink(){
  try{
    if(!validateInput.url(linkURL.trim())){
      return Alert.alert("Link", "Link invalido")       
    }
    if(!linkTitle.trim()){
      return Alert.alert("Link", "Informe um título para o link")      
    }

    setIsCreatingLinkTrip(true)

    await linksServer.create({
      tripId,
      title: linkTitle,
      url: linkURL,
    })

    Alert.alert("Link", "Link criado com sucesso!")
    resetNewLinkFields()
  }catch(error){
    console.log(error)
  }finally{
    setIsCreatingLinkTrip(false)
  }
}

  return (
  <View className="flex-1 mt-10">
    <Text className="text-zinc-50 text-2xl font-semibold mb-2">
      Links importantes
    </Text>

    <View className="flex-1">
      <Button variant="secondary" onPress={() => setShowNewLinkModal(true)}>
        <Plus color={colors.zinc[200]} size={20}/>
        <Button.Title>Cadastrar novo link</Button.Title>
      </Button>
    </View>

    <Modal 
    title="Cadastrar link" 
    subtitle="Todos os convidados podem visualizar os links importantes"
    visible={showNewLinkModal}
    onClose={() => setShowNewLinkModal(false)}
    >
      <View className="gap-2 mb-3">
        <Input variant="secondary">
          <Input.Field
          placeholder="Título do link"
          onChangeText={setLinkTitle}
          />
        </Input>

        <Input variant="secondary">
          <Input.Field
          placeholder="URL "
          onChangeText={setLinkURL}
          />
        </Input>
      </View>
       <Button isLoading={isCreatingLinkTrip} onPress={handleCreateTripLink}>
        <Button.Title>Salvar link</Button.Title> 
       </Button>
    </Modal>
  </View>
);
}
