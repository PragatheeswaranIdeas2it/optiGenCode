import Select from "react-select";
import { dracula, CopyBlock } from "react-code-blocks";
import { getBranchList, getCodeLamaUrl, getCommitList } from "../api";
import { useEffect, useState } from "react";

const suggestionOption = [
  { value: "Suggestion 01", label: "Suggestion 01" },
  { value: "Suggestion 02", label: "Suggestion 02" },
  { value: "Suggestion 03", label: "Suggestion 03" },
];

interface Branch {
  name: string;
  commit: any; // You may want to replace 'any' with a more specific type based on your data structure
  protected: boolean;
  protection: any; // Similarly, replace 'any' with the actual type for 'protection'
  protection_url: string;
}

interface ModifiedBranch {
  name: string;
  value: string;
  label: string;
  commit: any; // You may want to replace 'any' with a more specific type based on your data structure
  protected: boolean;
  protection: any; // Similarly, replace 'any' with the actual type for 'protection'
  protection_url: string;
}

interface BranchCommit {
  sha: string;
  node_id: string;
  commit: any;
  url: string;
  html_url: string;
  comments_url: string;
  author: any;
  committer: any;
  parents: any[];
}

interface ModifiedBranchCommit {
  sha: string;
  node_id: string;
  commit: any;
  value: string;
  label: string;
  url: string;
  html_url: string;
  comments_url: string;
  author: any;
  committer: any;
  parents: any[];
}

export default function Home() {
  const [branches, setBranches] = useState<ModifiedBranch[]>();
  const [commits, setCommits] = useState<BranchCommit[]>();
  const [suggesstion, setSuggesstion] = useState<string | null>();
  const [activeBranch, setActiveBranch] = useState<string>("master");
  const [isLoading, setIsLoading] = useState(false);
  const code = `fun update(id: String, entity: TemplateModel) {
    val templateModel: TemplateModel? =
      repo.getById(entity.id) ?: throw DataNotFoundException(ExceptionMessage.NO_DATA_FOUND)
      entity._id = templateModel!!._idrepo.save(entity)
    }`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getBranchList();
        const modifiedBranch = data.map((value: Branch) => ({
          ...value,
          label: value.name,
          value: value.name,
        }));
        setBranches(modifiedBranch);
      } catch (error) {
        console.error(`Error fetching branch list: ${error}`);
      }
    };

    fetchData();
  }, []);

  const getCommitLists = async (selectedBranch: string) => {
    try {
      const { data } = await getCommitList(selectedBranch);
      setActiveBranch(selectedBranch);
      const modifiedCommit = data.map((value: ModifiedBranchCommit) => ({
        ...value,
        label: value.sha,
        value: value.sha,
      }));
      setCommits(modifiedCommit);
    } catch (error) {
      console.error(`Error fetching commit list: ${error}`);
    }
  };

  const getCode = async () => {
    console.log(activeBranch);
    setIsLoading(true);
    try {
      const data = await getCodeLamaUrl(activeBranch);
      console.log(data?.data?.choices);
      setSuggesstion(data?.data?.choices?.[0]?.text);
      // // setActiveBranch(activeBranch || "master");
      // console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(`Error fetching commit list: ${error}`);
      setIsLoading(false);
    }
  };
  console.log(suggesstion);
  return (
    <>
      <div className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>
          <div className="mx-auto max-w-2xl">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                OptiGen AI Driven Code Performance Tool{" "}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Enhance the efficiency of software development
              </h1>
              <div>
                <form className="text-left pt-12 grid md:grid-cols-12 gap-2">
                  <div className="col-start-1 col-end-7">
                    <label
                      htmlFor="Branches"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Branches
                    </label>
                    <Select
                      options={branches}
                      onChange={(branchName: any) =>
                        getCommitLists(branchName?.name)
                      }
                    />
                  </div>
                  <div className="col-start-7 col-end-13">
                    <label
                      htmlFor="Commits"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Commits
                    </label>
                    <Select
                      options={commits}
                      onChange={(commitName: any) => console.log(commitName)}
                    />
                  </div>
                </form>
              </div>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  disabled={!activeBranch}
                  onClick={getCode}
                  className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm m-2 p-10 transition-all duration-500 bg-gradient-to-br to-indigo-500 via-indigo-600 from-indigo-800 hover:bg-gradient-to-br hover:to-indigo-800 hover:via-indigo-600 hover:from-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {`Get Suggestion`}
                  <span aria-hidden="true" className="px-2">
                    &rarr;
                  </span>
                </button>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div
              role="status"
              className="flex items-center justify-center w-full h-full py-24"
            >
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : !suggesstion ? (
            <p className="text-xl font-bold pt-12">
              Please Select Branch and commits
            </p>
          ) : (
            <main className="text-left py-8 grid md:grid-cols-12 gap-2">
              <div className="col-span-6 border-dashed border-2 border-indigo-600 py-6 px-2">
                <div className="flex justify-between w-full py-5">
                  <p className="text-xl font-bold">Sugesstions</p>
                  <div>
                    <Select options={suggestionOption} />
                  </div>
                </div>
                <CopyBlock
                  text={suggesstion}
                  language={"kotlin"}
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
              </div>
              <div className="col-span-6 border-dashed border-2 border-indigo-600 py-6 px-2">
                <div className="flex justify-between w-full py-5">
                  <p className="text-xl font-bold">Optimized</p>
                  <div>
                    <Select options={suggestionOption} />
                  </div>
                </div>
                <CopyBlock
                  text={code}
                  language={"jsx"}
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
              </div>
            </main>
          )}

          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
