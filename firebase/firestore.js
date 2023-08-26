import { db } from '@/firebase/firebaseConfig'
import { addDoc, collection, doc, getDoc, setDoc, getDocs, updateDoc, query, writeBatch } from "firebase/firestore"; 

export const firestore= {

  addUser : async (user) => {
    const userRef = doc(db, "users", user?.uid)
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      await setDoc(userRef, {
        name : user.displayName !== null ? user.displayName : "Guest",
        email : user.email,
        createdAt : user.metadata.createdAt,
        uid : user.uid,
      });
    } else {
      // await updateDoc(userRef, {
      //   name : user.displayName,
      //   email : user.email,
      //   createdAt : user.createdAt,
      //   uid : user.uid,
      // });
      console.log("Welcome Back!!")
    }
  },

    readUser : async(user)=>{
      const userRef = doc(db, "users", user.user_id)
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return docSnap.data()
      } else {
        console.log("No such document!");
      }
        
    },
    createRepo : async(user, values)=> {
      const userRef = doc(db, "users", user.user_id)
      const repoRef = doc(userRef, "repos", values.repo)
      const mainRef= doc(repoRef, "files", "main")
      const readmeRef= doc(repoRef, "files", "README")
      const docSnap = await getDoc(repoRef);

      if (!docSnap.exists()) {
        await setDoc(repoRef, {
          author : values?.author || "Guest",
          description : values.description,
          languageId : values.language,
          repo : values.repo,
          status : values.status
        });
        await setDoc(mainRef, {
          name: "main",
          code: "//Good Luck Coding....",
          languageId: values.language,
        }
        )
        await setDoc(readmeRef, {
          name: "README",
          code: "This is repo is created using codeCat",
          languageId: 43,
        }
        )
        return 1
      } else {
        alert("Repo already exists")
        return 0
      }
    },

    getFiles: async (userId, repo)=> {
      const re= {}
      const userRef = doc(db, "users", userId)
      const repoRef = doc(userRef, "repos", repo)
      const filesRef= collection(repoRef, "files")
      const docSnap = await getDoc(repoRef);

      const querySnapshot = await getDocs(filesRef);
      querySnapshot.forEach((doc) => {
      re[doc.id]= doc.data()
    });
    return(re)
    },

    updateAllDocuments : async (userId, repo) => {
      const userRef = doc(db, "users", userId)
      const repoRef = doc(userRef, "repos", repo)
      const filesRef= collection(repoRef, "files")

      const querySnapshot = await getDocs(filesRef);
    
      // Iterate through each document and update it
      querySnapshot.forEach((doc) => {
        const docRef = doc(filesRef);
        updateDoc(docRef, updateData);
      });
    },

    getMyRepos: async(userId)=>{
      const re= []
      const querySnapshot = await getDocs(
        query(collection(db, `users/${userId}/repos`))
      )
      
      querySnapshot.forEach((doc) => {
        re.push(doc.data())
      });
      return re
    },

    saveFiles : async( userId, repo, data )=> {
      const userDocRef = doc(db, "users", userId);
      const repoDocRef = doc(userDocRef, "repos", repo);
      const repoFilesColRef = collection(repoDocRef, "files");

      const batch = writeBatch(db);

      for (let [docId, fileData] of Object.entries(data)) {
        batch.update(
          doc(repoFilesColRef, docId),
          { code: fileData.code }
        );
      };

      batch.commit()
      .then(() => console.log("updates successful"))
      .catch((err) => console.error("updates failed", err));
    },

    addNewFile: async (userId, repo, lang, newFileName)=>{
      const userRef = doc(db, "users", userId)
      const repoRef = doc(userRef, "repos", repo)
      const filesRef= doc(repoRef, "files", newFileName)

      await setDoc(filesRef, {
        name: newFileName,
        languageId: lang,
        code: ""
      });
      if (typeof window !== "undefined"){
        window.location.reload()
      }

    },
}