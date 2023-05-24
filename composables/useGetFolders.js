import { useUser } from "../stores/user.js";
import { useAppStringData } from "../stores/appStringData.js";

export const useGetFolders = async () => {
  const { deleteUser } = useUser();
  const { deleteAppData } = useAppStringData();
  const selectedFolder = ref("");

  // get folders from the server
  let { data: root, error } = await useFetch("/api/getFiles");
  if (error.value !== null) {
    console.log(
      "caught authentication error, deleting user",
      error.value.statusCode
    );
    deleteUser();
    deleteAppData();
    await navigateTo("/login");
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
