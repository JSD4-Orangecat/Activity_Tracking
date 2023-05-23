/* eslint-disable react/prop-types */
import BarLoader from "react-spinners/BarLoader";
import biking from "/exercises/biking.png";
import running from "/exercises//running.png";
import swimming from "/exercises//swimming.png";
import cardio from "/exercises//cardio.png";
import walking from "/exercises//walking.png";

function Form({
  handleChangeInput,
  calcDuration,
  changeColor,
  inputs,
  handleFormSubmit,
  durationAlert,
  handleCancel,
  isProcessing,
}) {
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="title-date">
          {/* Add data: Title  */}
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            placeholder="type your title"
            name="title"
            id="title"
            required
            onChange={handleChangeInput}
            value={inputs.title}
          ></input>

          {/* Add data: Date */}
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={handleChangeInput}
            required
            value={inputs.date}
          ></input>
        </div>

        {/* Add data: activity */}
        <div className="activity-container">
          <p>Activity:</p>
          <div className="activity-list">
            <div className="tile">
              <input
                type="radio"
                value="biking"
                name="type"
                id="biking"
                required
                onChange={handleChangeInput}
                checked={inputs.type === "biking"}
              ></input>
              <label htmlFor="biking" className="activity-label">
                <img src={biking} alt="biking" className="activity-image" />
                <h6>Biking</h6>
              </label>
            </div>
            <div className="tile">
              <input
                type="radio"
                value="running"
                name="type"
                id="running"
                required
                onChange={handleChangeInput}
                checked={inputs.type === "running"}
              ></input>
              <label htmlFor="running" className="activity-label">
                <img src={running} alt="running" className="activity-image" />
                <h6>running</h6>
              </label>
            </div>
            <div className="tile">
              <input
                type="radio"
                value="swimming"
                name="type"
                id="swimming"
                required
                onChange={handleChangeInput}
                checked={inputs.type === "swimming"}
              ></input>
              <label htmlFor="swimming" className="activity-label">
                <img src={swimming} alt="swimming" className="activity-image" />
                <h6>swimming</h6>
              </label>
            </div>
            <div className="tile">
              <input
                type="radio"
                value="cardio"
                name="type"
                id="cardio"
                required
                onChange={handleChangeInput}
                checked={inputs.type === "cardio"}
              ></input>
              <label htmlFor="cardio" className="activity-label">
                <img src={cardio} alt="cardio" className="activity-image" />
                <h6>cardio</h6>
              </label>
            </div>
            <div className="tile">
              <input
                type="radio"
                value="walking"
                name="type"
                id="walking"
                required
                onChange={handleChangeInput}
                checked={inputs.type === "walking"}
              ></input>
              <label htmlFor="walking" className="activity-label">
                <img src={walking} alt="walking" className="activity-image" />
                <h6>walking</h6>
              </label>
            </div>
          </div>
        </div>

        {/* Add data: Duration */}
        <div className="time_duration">
          <label htmlFor="time_start">Time-Start:</label>
          <input
            type="time"
            className="time"
            name="time_start"
            onChange={handleChangeInput}
            required
            value={inputs.time_start}
          ></input>
          <label htmlFor="time-end" className="time2">
            Time-End:
          </label>
          <input
            type="time"
            className="time"
            name="time_end"
            onChange={handleChangeInput}
            required
            value={inputs.time_end}
          ></input>
          <button type="button" onClick={calcDuration}>
            Duration
          </button>
          {durationAlert && (
            <p className="alert-duration">*check your duration</p>
          )}
        </div>

        {/* Add data: Task status */}
        <div className="taskStatus">
          <p>Task Status:</p>
          <div className="wrapper">
            <input
              type="radio"
              value="complete"
              name="task"
              id="complete"
              onClick={(e) => changeColor(e)}
              onChange={handleChangeInput}
              required
              checked={inputs.task === "complete"}
            ></input>
            <input
              type="radio"
              value="inProgress"
              name="task"
              id="inProgress"
              onClick={(e) => changeColor(e)}
              onChange={handleChangeInput}
              checked={inputs.task === "inProgress"}
            ></input>
            <input
              type="radio"
              value="fail"
              name="task"
              id="fail"
              onClick={(e) => changeColor(e)}
              onChange={handleChangeInput}
              checked={inputs.task === "fail"}
            ></input>
            <label htmlFor="complete" className="option option-1">
              <div className="dot dot-1"></div>
              <span>Missison Complete</span>
            </label>
            <label htmlFor="inProgress" className="option option-2">
              <div className="dot dot-2"></div>
              <span>In Progress</span>
            </label>
            <label htmlFor="fail" className="option option-3">
              <div className="dot dot-3"></div>
              <span>Missison Failed</span>
            </label>
          </div>
        </div>

        {/* Add data: Caption */}
        <textarea
          id="textbox"
          placeholder="Add caption:"
          name="caption"
          onChange={handleChangeInput}
          value={inputs.caption}
          required
        ></textarea>

        {/* submit button */}
        <button type="submit" className="btn-save" disabled={isProcessing}>
          <span>{isProcessing ? "Processing ... " : "Submit"}</span>
        </button>
        {isProcessing ? (
          <div className="loading-icon">
            <BarLoader
              color="#FF7B54"
              size={200}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : null}
      </form>
      <button value="cancel" className="btn-cancel" onClick={handleCancel}>
        Cancel
      </button>
    </>
  );
}

export default Form;
