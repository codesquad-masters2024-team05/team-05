import styled from "styled-components";
import Header from "../header/Header";
import Comment from "./Comment";
import Sidebar from "./Sidebar";
import CreatorForm from "../creator/CreatorForm";
import plusIcon from "../../img/icon/plusIcon.svg";
import editIcon from "../../img/icon/editIcon.svg";
import archieveIcon from "../../img/icon/archieveIcon.svg";
import closedIssueIcon from "../../img/icon/closedIssueIcon.svg";
import openedIssueIcon from "../../img/icon/openedIssueIcon.svg";
import openedIssueIconInDark from "../../img/icon/openedIssueIcon_dark.svg";
import useIssueDetailLogic from "../../hooks/logics/useIssueDetailLogic";
import dateUtils from "../../utils/DateUtils";

function IssueDetail() {
  const { issueId, issueContent, commentRef, isSubmitable, handleOnChange, handleStateToggleClick } = useIssueDetailLogic();
  const { title, author, publishedAt, comments, closed } = issueContent || {};

  return (
    <Wrapper>
      <Header />
      <TopWrapper>
        <TitleDescription>
          <TitleText>{title || "제목 없음"}</TitleText>
          <IssueNumber>#{issueId}</IssueNumber>
        </TitleDescription>
        <ButtonWrapper>
          <IssueToggleButton>
            <img src={editIcon} />
            제목 편집
          </IssueToggleButton>
          <IssueToggleButton onClick={handleStateToggleClick}>
            {closed ? (
              <>
                <img src={openedIssueIconInDark} />
                <span>다시 열기</span>
              </>
            ) : (
              <>
                <img src={archieveIcon} />
                <span>이슈 닫기</span>
              </>
            )}
          </IssueToggleButton>
        </ButtonWrapper>
      </TopWrapper>
      <IssueInfo>
        <IssueStateText>
          <img src={closed ? closedIssueIcon : openedIssueIcon} />
          <span>{closed ? "닫힌 이슈" : "열린 이슈"}</span>
        </IssueStateText>
        <LastChangedTime>
          이 이슈가 {publishedAt ? dateUtils.parseTimeDifference(publishedAt) : "알 수 없는 시간"}에{" "}
          {author || "알 수 없음"}님에 의해 열렸습니다. - 코멘트 {comments?.length || 0}개
        </LastChangedTime>
      </IssueInfo>
      <BodyBoundary />
      <ContentWrapper>
        <CommentWrapper>
          {comments && comments.map((comment) => <Comment {...comment} isAuthor={comment.author === author} />)}
          <CreatorForm ref={commentRef} labelText="코멘트를 입력하세요." height={"184px"} onChange={handleOnChange} />
          <SubmitButton isSubmitable={isSubmitable}>
            <img src={plusIcon} /> 코멘트 작성
          </SubmitButton>
        </CommentWrapper>
        <Sidebar />
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1280px;
  display: block;
`;

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TitleDescription = styled.div`
  display: flex;
  font-size: 2em;
  font-weight: 700;
  gap: 0.25em;
`;

const TitleText = styled.span`
  color: #14142b;
`;

const IssueNumber = styled.span`
  color: #6e7191;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5em;
`;

const IssueToggleButton = styled.button`
  width: 10.66em;
  height: 3.33em;
  font-size: 0.75em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  background-color: transparent;
  border: 1px solid #595959;
  border-radius: 1em;
  cursor: pointer;
`;

const IssueInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-top: 1.5em;
`;

const IssueStateText = styled.div`
  height: 2em;
  padding: 0 1em;
  display: flex;
  gap: 0.5em;
  align-items: center;
  background-color: #595959;
  color: #fff;
  border: 1px solid #595959;
  border-radius: 1em;
`;

const LastChangedTime = styled.span`
  font-weight: 500;
  line-height: 1.5em;
  color: #6e7191;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 2em;
`;

const CommentWrapper = styled.div`
  width: calc(100% - 288px);
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1.5em;
`;

const SubmitButton = styled.button<{ isSubmitable: boolean }>`
  width: 10.7em;
  height: 3.3em;
  font-size: 0.75em;
  border: 1px solid #595959;
  border-radius: 1.3em;
  background-color: #595959;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ isSubmitable }) => (isSubmitable ? "1" : "0.5")};
  transition: all 0.5s ease;
`;

const BodyBoundary = styled.hr`
  margin: 2em 0;
  height: 1px;
  color: #eceef5;
`;

export default IssueDetail;
