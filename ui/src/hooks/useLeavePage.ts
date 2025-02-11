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

import { useEffect } from "react";
import { unstable_usePrompt, useLocation} from "react-router-dom";
import { useBeforeUnload,  } from "react-use";
unstable_usePrompt
export const useLeavePageConfirm = (
    isConfirm = true,
    message = "Changes not saved, are you sure to leave this page?"
) => {
    // SPA pages switch
    unstable_usePrompt({ when: isConfirm, message })

    // browser pages action
    useBeforeUnload(isConfirm, message);
    const location = useLocation()
    useEffect(() => {
        if (isConfirm && !window.confirm(message)) {
            return
        };
    }, [message, location]);
};