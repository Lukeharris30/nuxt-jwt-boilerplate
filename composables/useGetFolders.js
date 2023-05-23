export const useGetFolders = async () => {
  const selectedFolder = ref("U1JBTUNvbW1vbi9Gb3Jtcw==");
  // get folders from the server
  let { data: root, error } = await useFetch("/api/getFiles");
  if (error.value !== null) {
    console.log("error getting files", error.value);
    if (error.value) {
      console.log(error.value.status);
      await navigateTo("/login");
    }
  }

  const mappedRoot = computed(() => {
    if (root.value?.folders?.length > 0) {
      return root.value?.folders.map((f) => ({
        key: f.key,
        label: f.display,
        lazy: true,
        icon: "folder",
        children: [],
      }));
    }
    return [];
  });
  return { mappedRoot, root, selectedFolder };
};
